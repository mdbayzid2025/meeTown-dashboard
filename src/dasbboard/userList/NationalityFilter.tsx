import { Select, Space, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";

const { Option } = Select;

const NationalityFilter = () => {
  const [countries, setCountries] = useState<
    { name: string; iso2: string; flag: string,  }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/flag/images"
        );
        const data = res.data;

        // sort by name
        data?.data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(data?.data);
      } catch (error) {
        console.error("Failed to load countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  function countryCodeToEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

  const handleChange = (iso2: string) => {
    const country = countries.find((c) => c.iso2 === iso2);
    let value = "";
    if (country) {
      const flag2 = countryCodeToEmoji(country?.iso2);
       value = `${flag2} ${country?.name}`;
    }
    updateSearchParams({ location: value });
  };

  return (
    <Select
      showSearch
      allowClear
      placeholder="Nationality"
      optionFilterProp="label"
      onChange={handleChange}
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      style={{ height: 42 }}
      className="w-[180px] md:w-[240px]"
      loading={loading}
      notFoundContent={loading ? <Spin size="small" /> : "No countries found"}
    >
      {countries.map((country: any) => (
        <Option
          key={country.iso2}
          value={country.iso2} // ✅ value এখন iso2
          label={`${country.iso2} ${country.name}`}
        >
          <Space>
            <img
              src={country.flag}
              alt={country.name}
              style={{ width: 20, height: 15, objectFit: "cover" }}
            />
           {country.name} {/* Dropdown দেখানোর জন্য */}
          </Space>
        </Option>
      ))}
    </Select>
  );
};

export default NationalityFilter;
