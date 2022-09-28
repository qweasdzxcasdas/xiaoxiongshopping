<template>
  <div class="pagination" id="abc">
    <button :disabled='pageNow==1' @click="$emit('pageemit',pageNow-1)">上一页</button>
    <button v-if="pagenumEnd.statr>1" @click="$emit('pageemit',1)" :class="{active:pageNow==1}">1</button>
    <button v-if="pagenumEnd.statr>2">...</button>


    <button v-for="(page,index) in pagenumEnd.end" :key="index" v-if="page>=pagenumEnd.statr" @click="$emit('pageemit',page)" :class="{active: pageNow==page}">{{page}}</button>
    
    <button v-if="pagenumEnd.end<totalInfo-1">...</button>
    <button v-if="pagenumEnd.end<totalInfo" @click="$emit('pageemit',totalInfo)" :class="{active:pageNow==totalInfo}">{{totalInfo}}</button>
    
    <button :disabled='pageNow==totalInfo' @click="$emit('pageemit',pageNow+1)">下一页</button>

    <button>一共有{{total}}条数据</button>
    
    <!-- <div class="fr page">
      <div class="sui-pagination clearfix">
        <ul>
          <li class="prev disabled">
            <a href="#">«上一页</a>
          </li>
          <li class="active">
            <a href="#">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">5</a>
          </li>
          <li class="dotted"><span>...</span></li>
          <li class="next">
            <a href="#">下一页»</a>
          </li>
        </ul>
        <div><span>共10页&nbsp;</span></div>
      </div>
    </div> -->
  </div>
</template>


<script>

export default {
  name: "pagination",
  //pageNow' 当前页数,'pageInfo'当前页面展示,'total'总共数据,'cont 连续展示
  props:['pageNow','pageInfo','total','cont'],
  computed:{
    
    
    //总页数
    totalInfo(){
      return Math.ceil(this.total/this.pageInfo)
    },
    pagenumEnd(){
      let {pageNow,cont}  =this
      let statr=0
      let end=0
      //异常状况 页码不够cont
      if(cont>this.totalInfo){
        statr=1
        end=this.totalInfo
      }else{
        //正常现象 页码总数大于5
        statr=pageNow-parseInt(cont/2)
        end=pageNow+parseInt(cont/2)
        //异常状况statr小于1
        if(statr<1){
          statr=1
          end=cont
          //异常状况end大于cont
        }
        if(end>this.totalInfo){
          end=this.totalInfo
          statr=this.totalInfo-cont+1
        }
      }

    return {statr,end}
    }


  }
};
</script>

<style lang="less" scoped>
.pagination {
  
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background:#409eff;
}
#abc{
  margin-left:20% 
}
</style>