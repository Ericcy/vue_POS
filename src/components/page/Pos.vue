<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span='7' class="orderList" id="orderArea">
          <el-tabs>
            <el-tab-pane label="点餐">
              <el-table :data="tableData" border style="width:100%">
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="count" label="数量" width="50"></el-table-column>
                <el-table-column prop="price" label="价钱" width="70"></el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template scope="scope">
                    <el-button type="text" size="small" @click="delSingleGood(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="totalDiv">
                <small>数量：</small>{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp; <small>金额：</small>{{totalMoney}}元
              </div>
              <div class="order-btn">
                <el-button type="warning" @click="setOrderData()">挂单</el-button>
                <el-button type="danger" @click="delAllGoods()">删除</el-button>
                <el-button type="success" @click="checkOut()">结账</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
            外卖
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span='17'>
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="oftenGood in oftenGoods" @click="addOrderList(oftenGood)">
                  <span>{{oftenGood.goodsName}}</span>
                  <span class="o-price">￥{{oftenGood.price}}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">
               <div>
                <ul class="cookList">
                  <li v-for="typeGood in type0Goods" @click="addOrderList(typeGood)">
                    <span class="foodImg"><img v-bind:src="typeGood.goodsImg" width="100%"/></span>
                    <span class="foodName">{{typeGood.goodsName}}</span>
                    <span class="foodPrice">￥{{typeGood.price}}元</span>
                  </li>
                </ul>
               </div>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <div>
                <ul class="cookList">
                  <li v-for="typeGood in type1Goods" @click="addOrderList(typeGood)">
                    <span class="foodImg"><img v-bind:src="typeGood.goodsImg" width="100%"/></span>
                    <span class="foodName">{{typeGood.goodsName}}</span>
                    <span class="foodPrice">￥{{typeGood.price}}元</span>
                  </li>
                </ul>
               </div>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <div>
                <ul class="cookList">
                  <li v-for="typeGood in type2Goods" @click="addOrderList(typeGood)">
                    <span class="foodImg"><img v-bind:src="typeGood.goodsImg" width="100%"/></span>
                    <span class="foodName">{{typeGood.goodsName}}</span>
                    <span class="foodPrice">￥{{typeGood.price}}元</span>
                  </li>
                </ul>
               </div>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <div>
                  <ul class="cookList">
                    <li v-for="typeGood in type3Goods" @click="addOrderList(typeGood)">
                      <span class="foodImg"><img v-bind:src="typeGood.goodsImg" width="100%"/></span>
                      <span class="foodName">{{typeGood.goodsName}}</span>
                      <span class="foodPrice">￥{{typeGood.price}}元</span>
                    </li>
                  </ul>
               </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Pos',
    data () {
      return {
        tableData: [],
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
        totalCount: 0,
        totalMoney: 0
      }
    },
    created: function () {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
      .then(reponse => {
        this.oftenGoods = reponse.data
      })
      .catch(error1 => {
        // alert('网络错误，不能访问。')
      })
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
      .then(reponse => {
        console.log(reponse)
        this.type0Goods = reponse.data[0]
        this.type1Goods = reponse.data[1]
        this.type2Goods = reponse.data[2]
        this.type3Goods = reponse.data[3]
      })
      .catch(error2 => {
        // alert('网络错误，不能访问。')
      })
    },
    mounted: function () {
      var orderHeight = document.body.clientHeight
      document.getElementById('orderArea').style.height = orderHeight + 'px'
    },
    methods: {
      addOrderList (goods) {
        // 每次添加前要先清零。
        this.totalCount = 0
        this.totalMoney = 0

        // 判断商品是否已经存在于订单列表中。
        let isHave = false
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].goodsId === goods.goodsId) {
            isHave = true
          }
        }
        // 根据判断编写业务逻辑
        if (isHave) {
          // 改变商品列表中的数量
          let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
          arr[0].count++
        } else {
          let newGoods = {goodsName: goods.goodsName, goodsId: goods.goodsId, price: goods.price, count: 1}
          this.tableData.push(newGoods)
        }
        this.getAllTotal()
      },
      // 单品的删除
      delSingleGood (goods) {
        this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
        this.getAllTotal()
      },
      // 数量金额汇总
      getAllTotal () {
        this.totalCount = 0
        this.totalMoney = 0
        if (this.tableData) {
          this.tableData.forEach((element) => {
            this.totalCount += element.count
            this.totalMoney = this.totalMoney + (element.count * element.price)
          })
        }
      },
      // 删除所有商品
      delAllGoods () {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
      },
      // 模拟结账
      checkOut () {
        if (this.totalCount !== 0) {
          this.tableData = []
          this.totalCount = 0
          this.totalMoney = 0
          // element 的组件
          this.$message({
            message: '结账成功，谢谢惠顾！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '老板理解你急切的心情！',
            type: 'error'
          })
        }
      },
      // 挂单的功能
      setOrderData () {
        let num = Math.random() * 1000 + 1212121
        let orderStr = ''
        for (let i = 0; i < this.tableData.length; i++) {
          orderStr += JSON.stringify(this.tableData[i])
        }
        console.log(JSON.parse(orderStr))
        window.localStorage.setItem('tableData' + num, orderStr)
      }
    }
  }
</script>

<style scoped>
  .orderList{
    background-color:#F9FAFC;
    border-right:1px solid #C0CCDA;
  }
  .order-btn{
    margin-top:10px;
  }
  .title{
    height:20px;
    boder-bottom:1px solid #D3dce6;
    background-color:#F9FAFC;
    padding:10px;
    text-align:left;
  }
  .often-goods-list ul li{
    list-style:none;
    float:left;
    border:1px solid #E5E9F2;
    padding:10px;
    margin:10px;
    background-color:#fff;
  }
  .o-price{
    color:#58B7FF;
  }
  .goods-type{
    clear:both;
  }
  .cookList li{
    list-style:none;
    width:23%;
    height:auto;
    overflow:hidden;
    border:1px solid #E5E9F2;
    background-color:#fff;
    padding:2px;
    float:left;
    margin:2px;
  }
  .cookList li span{
    display:block;
    float:left;
  }
  .foodImg{
    width:40%;
  }
  .foodName{
    font-size:16px;
    padding-left:10px;
    color:brown;
  }
  .foodPrice{
    font-size:16px;
    padding-left:10px;
    padding-top:10px;
  }
  .totalDiv{
    background-color: #fff;
    border-bottom:1px solid #E5E9F2;
    padding:10px;
  }
</style>
