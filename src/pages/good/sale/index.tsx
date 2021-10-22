import { Divider } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import SearchForm from '../sale/components/Form'
import List from '../sale/components/List'

const Sale = () => {
  return (
    <LayoutMenu>
      <SearchForm />
      <Divider />
      <List />
    </LayoutMenu>
  )
}
export default Sale
