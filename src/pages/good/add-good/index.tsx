/*
 * @Author: your name
 * @Date: 2021-10-28 19:51:30
 * @LastEditTime: 2021-10-28 19:57:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /content_manage_system/src/pages/good/add-good/index.tsx
 */
import { useState, useRef } from 'react'
import { Form, Button } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import Properties from '../components/properties'
import Category from '../components/Category'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../store/reduces'
import { GoodState } from '../../../store/reduces/good.reducer'
import { listSpecByCategoryId } from '../../../api/good'

const AddGood = () => {
  // const [isReady, setIsReady] = useState(false)
  const [listSpec, setListSpec] = useState({})
  // 获取登录结果
  const good = useSelector<AppState, GoodState>((state) => state.good)
  console.log(good)
  let data
  const getListSpec = async () => {
    // const listSpec =  await listSpecByCategoryId({ categoryId: good.category.id })
    //假数据
    const listSpec = [
      {
        creater: '',
        id: 2,
        name: '颜色',
        sort: 0,
        specColleId: 1,
        type: 1,
        updator: '',
        value: [
          {
            id: 200,
            specColleId: 3,
            specId: 2,
            value: '黑色'
          },
          {
            id: 200,
            specColleId: 3,
            specId: 2,
            value: '红色'
          }
        ]
      },
      {
        creater: '',
        id: 3,
        name: '尺码',
        sort: 0,
        specColleId: 1,
        type: 1,
        updator: '',
        value: [
          {
            id: 300,
            specColleId: 3,
            specId: 3,
            value: 'S'
          },
          {
            id: 200,
            specColleId: 3,
            specId: 3,
            value: 'M'
          },
          {
            id: 200,
            specColleId: 3,
            specId: 3,
            value: 'L'
          }
        ]
      }
    ]
    setListSpec(listSpec)
    // return listSpec
  }
  useEffect(() => {
    getListSpec()
  }, [])
  // getListSpec()
  return (
    <LayoutMenu>
      {good.category.id && listSpec && listSpec !== {} ? (
        <Properties actionType="add" listSpec={listSpec} />
      ) : (
        <Category />
      )}
    </LayoutMenu>
  )
}
export default AddGood
