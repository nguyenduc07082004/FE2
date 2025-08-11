import { Input } from "antd";
const { Search } = Input;

type Props = {
  searchText: string;
  setSearchText: (v: string) => void;
  onSearch: (v: string) => void;
};

const ProductSearchForm = ({ searchText, setSearchText, onSearch }: Props) => (
  <Search
    placeholder="Tìm sản phẩm (có dấu hoặc không dấu)..."
    allowClear
    enterButton="Tìm"
    size="large"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    onSearch={onSearch}
    style={{ maxWidth: 400, marginBottom: 20 }}
  />
);

export default ProductSearchForm;