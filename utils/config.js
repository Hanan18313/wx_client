/*
* 配置文件
*/

//var basePath = 'https://mp.langjie.com/wx'
var basePath = 'http://localhost:3000/wx'
var urlList = {
  //用户信息
  checkManager: basePath + '/employee/checkManager', //判断是否为管理人员
  //奖品
  imgUrl : basePath + '/', //图片路/////径
  userBaseInfo: basePath + '/userInfo', //小程序获取user信息
  prizeShow_prize : basePath + '/prize', //
  prizeView : basePath + '/prize/prizeView', //预览------
  prizeOrderByDraw : basePath + '/prize/orderByDraw',//按抽奖排序
  prizeAdd : basePath + '/prize/prizeAdd', //奖品新增 
  prize_uploadImage : basePath + '/prize/uploadImage',//上传图片
  prizeEdit_prizeShow : basePath + '/prize/prizeEdit_show',//奖品编辑展示
  prizeEdit_update : basePath +'/prize/prizeUpdate', // 修改
  prizeEdit_delete : basePath + '/prize/prizeDelete', //删除
  //会员签到
  member_signIn: basePath + '/signIn', //查找signIn_id
  //member_create_signIn_id: basePath + '/member/signIn/create_signIn_id',//创建signIn_id
  member_checkSignIn : basePath + '/checkSignIn', //判断签到状态
  checked_vip : basePath + '/member/checked_vip',
  //member_socket_signIn_id : socket + '/member/add_signIn_id',//分配签到编号
  member_notMember : basePath + '/member/Not_member', // 没有关注公众号也不是会员


  //抽奖
  member_draw: basePath + '/member/draw', //开始抽奖
  // member_draw_prizeView: basePath + '/prize/prizeView', //抽奖-奖品item
  member_signIn_id: basePath + '/center/winnerInfo', //获奖人id
  member_show_winPrize: basePath + '/member/winPrize',
  member_winnerItems: basePath + '/center/winnerItems',//获奖人名单
  prize_singlePrize : basePath + '/center/draw',//单个奖品
  //签到中心
  center_prePrize: basePath + '/center/prePrize', //奖品预览（权限查看）
  center_Tb_winner : basePath + '/center/Tb_winner', //同步winner 信息
  center_attendee: basePath + '/attendee',//与会人员
  center_search_attendee : basePath + '/search_attendee',//搜索与会人员
  center_meetting : basePath + '/center/meetting',//会议安排
  center_production : basePath + '/center/production',//产品展示 调用奖品管理预览接口
  center_about_langjie : basePath + '/center/about_langjie', //公司简介
  center_isLunch : basePath + '/isLunch',//午宴---put
  center_mineSignInfo: basePath + '/member_info',//我的信息
  center_minePrize : basePath + '/center/minePrize',
  prizeView: basePath + '/prize_pool', //奖品池









  //产品管理
  // product_productAdd : basePath + '/product/productAdd', //产品添加
  // product_uploadImage : basePath + '/product/product_uploadImages',//上传图片
  // product_productList : basePath + '/product/product_list',//产品列表
  // product_productDelete : basePath + '/product/productDelete', //删除
  // product_productUpdate : basePath + '/product/productUpdate', //修改
  // product_single_product : basePath + '/product/single_product',//单个产品
  // product_product_wc884 : basePath + '/product/product_wc884', //威程884

}
module.exports = urlList