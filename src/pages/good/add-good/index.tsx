import { useState, useRef } from 'react'
import { Form, Button } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import Properties from '../components/Properties'

const AddGood = () => {
  return (
    <LayoutMenu>
      <Properties actionType="add" />
    </LayoutMenu>
  )
}
export default AddGood
