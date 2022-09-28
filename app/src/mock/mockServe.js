//引入mockjs
import Mock from 'mockjs'
//引入两个模块
import banner from './banner.json'
import floor from './floor.json'

Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})


