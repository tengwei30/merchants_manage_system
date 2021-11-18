import { Divider } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import SearchForm from './components/Form'
import List from './components/List'

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
