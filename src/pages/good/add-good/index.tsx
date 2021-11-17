import { useState, useRef, useEffect } from 'react'
import { Form, Button } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import Properties from '../components/properties'
import Category from '../components/Category'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../store/reduces'
import { GoodState } from '../../../store/reduces/good.reducer'
import { listSpecByCategoryId } from '../../../api/good'
//假数据
// const listSpec = [
//   {
//     creater: '',
//     id: 2,
//     name: '颜色',
//     sort: 0,
//     specColleId: 1,
//     type: 1,
//     updator: '',
//     value: [
//       {
//         id: 201,
//         specColleId: 1,
//         specId: 2,
//         value: '黑色'
//       },
//       {
//         id: 202,
//         specColleId: 1,
//         specId: 2,
//         value: '红色'
//       }
//     ]
//   },
//   {
//     creater: '',
//     id: 3,
//     name: '尺码',
//     sort: 0,
//     specColleId: 1,
//     type: 1,
//     updator: '',
//     value: [
//       {
//         id: 301,
//         specColleId: 1,
//         specId: 3,
//         value: 'S'
//       },
//       {
//         id: 302,
//         specColleId: 1,
//         specId: 3,
//         value: 'M'
//       },
//       {
//         id: 303,
//         specColleId: 1,
//         specId: 3,
//         value: 'L'
//       }
//     ]
//   },
//   {
//     creater: '',
//     id: 4,
//     name: '内存',
//     sort: 0,
//     specColleId: 1,
//     type: 1,
//     updator: '',
//     value: [
//       {
//         id: 400,
//         specColleId: 1,
//         specId: 4,
//         value: '126G'
//       },
//       {
//         id: 401,
//         specColleId: 1,
//         specId: 4,
//         value: '256G'
//       },
//       {
//         id: 402,
//         specColleId: 1,
//         specId: 4,
//         value: '516G'
//       }
//     ]
//   }
// ]
const AddGood = () => {
  // const [listSpec, setListSpec] = useState([])
  // 获取结果
  const good = useSelector<AppState, GoodState>((state) => state.good)
  // console.log(good)
  // const getListSpec = async () => {
  //   const result: any = await listSpecByCategoryId({ categoryId: good.category.id })

  //   if (result.code === '000000') {
  //     setListSpec(result.data as [])
  //   }
  // }
  // useEffect(() => {
  //   getListSpec()
  // }, [])
  return (
    <LayoutMenu>{good.category.id ? <Properties actionType="add" /> : <Category />}</LayoutMenu>
  )
}
export default AddGood
