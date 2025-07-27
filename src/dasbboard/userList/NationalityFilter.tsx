import { Select, Space } from 'antd';



// Sample countries data
const countries = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Germany", code: "de" },
  { name: "Bangladesh", code: "bd" },
  { name: "India", code: "in" },
  { name: "Australia", code: "au" },
  { name: "Japan", code: "jp" }
];

// Function to render flag image
const getFlagUrl = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`; // You can use w20, w40, w80 for size


const {Option} = Select;
const NationalityFilter = () => {
   
 const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <div>
        <Select
      showSearch
      allowClear 
      placeholder="Nationality"
      optionFilterProp="label"
      onChange={handleChange}
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      style={{ height: 42, }}
      className='w-[150px] md:w-[200px]'
    >
      {countries.map((country) => (
        <Option
          key={country.code}
          value={country.code}
          label={country.name}
        >
          <Space>
            <img
              src={getFlagUrl(country.code)}
              alt={country.name}
              style={{ width: 20, height: 15, objectFit: "cover" }}
            />
            {country.name}
          </Space>
        </Option>
      ))}
    </Select>
    </div>
  )
}

export default NationalityFilter;