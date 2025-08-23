import { Select, Space, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";

const { Option } = Select;

const NationalityFilter = () => {
  const [countries, setCountries] = useState<
    { name: string; iso2: string; flag: string }[]
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
        
        // Optionally sort by name
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

  const handleChange = (value: string) => {
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
      {countries.map((country) => (
        <Option key={country.iso2} value={country?.name} label={country.name}>
          <Space>
            <img
              src={country.flag}
              alt={country.name}
              style={{ width: 20, height: 15, objectFit: "cover" }}
            />
            {country.name}
          </Space>
        </Option>
      ))}
    </Select>
  );
};

export default NationalityFilter;
