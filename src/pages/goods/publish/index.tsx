import { useState, useRef, useEffect } from 'react'
import { Form, Button } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import Properties from '../components/properties'
import Category from '../components/Category'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../store/reduces'
import { GoodsState } from '../../../store/reduces/goods.reducer'
const Publish = () => {
  // 获取结果
  const goods = useSelector<AppState, GoodsState>((state) => state.goods)
  return (
    <LayoutMenu>{goods.category.id ? <Properties actionType="add" /> : <Category />}</LayoutMenu>
  )
}
export default Publish
