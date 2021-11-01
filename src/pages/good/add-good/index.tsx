import { useState, useRef } from 'react'
import { Form, Button } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import Properties from '../components/Properties'
import Category from '../components/Category'

const AddGood = () => {
  return (
    <LayoutMenu>
      {/* <Properties actionType="add" /> */}
      <Category />
    </LayoutMenu>
  )
}
export default AddGood
