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
import Properties from '../components/Properties'

const AddGood = () => {
  return (
    <LayoutMenu>
      <Properties actionType="add" />
    </LayoutMenu>
  )
}
export default AddGood
