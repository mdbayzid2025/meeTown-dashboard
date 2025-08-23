
import { Select, Space } from "antd";
import { countriesData } from "../../assets/data/countriesData";


const SelectCountries = ({
  placeholder = "Select Country",
  onChange,
  value,  
 }:any) => {
  // 1. Remove duplicates by ISO2 (unique identifier for each country)
  const uniqueCountries = Array.from(
    new Map(countriesData.map((c: any) => [c.iso2, c])).values()
  );

  // 2. Sort alphabetically by name
  const sortedCountries = uniqueCountries.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Select
      showSearch
      allowClear
      value={value}
      placeholder={placeholder}
      optionFilterProp="label"
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      style={{ height: 42 }}
      notFoundContent="No countries found"
    >
      {sortedCountries.map((country: any) => (
        <Select.Option
          key={country.iso2}
          value={country.iso2} // ✅ store only ISO2
          label={country.name}
        >
          <Space>
            <img
              src={country.flag}
              alt={country.name}
              style={{ width: 20, height: 15, objectFit: "cover" }}
            />
            {country.name}
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectCountries;

/*

import { Select, Space } from "antd";
import { countriesData } from "../../assets/data/countriesData";


interface SelectCountriesProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string | null;
  width?: number | string;
}

const SelectCountries: React.FC<SelectCountriesProps> = ({
  placeholder = "Select Country",
  onChange,
  value,
  width = "240px",
}) => {
  return (
    <Select
      showSearch
      allowClear
      value={value}
      placeholder={placeholder}
      optionFilterProp="label"
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      style={{ height: 42, width }}
      notFoundContent="No countries found"
    >
      {countriesData.map((country :any) => (
        <Select.Option
          key={country.iso2}
          value={`${country.iso2} ${country.name}`} // ✅ ISO2 + Name as value
          label={country.name}                     // ✅ Search by country name
        >
          <Space>
            <img
              src={country.flag}
              alt={country.name}
              style={{ width: 20, height: 15, objectFit: "cover" }}
            />
            {country.name}
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};




*/