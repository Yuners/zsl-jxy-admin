export default {
    // -1:申请退货; -2:退货驳回; -3:退款中; -4:退款成功; -5:退款驳回; 0:待发货; 1:待收货; 2:已收货; 3:待评价; 4:订单失效; 5:待付款; 6:订单完成;
        "-1": {
            text: '退货申请',
            color: '#8E24AA'
        },
        "-2": {
            text: '退货驳回',
            color: '#8E24AA'
        },
        "-3": {
            text: '退款中',
            color: 'green'
        },
        "-4": {
            text: '已退款',
            color: 'red'
        },
        "-5": {
            text: '退款驳回',
            color: 'red'
        },
        "-6": {
            text: '退款中(等待用户再次确认)',
            color: 'red'
        },
        "0": {
            text: '待发货',
            color: 'green'
        },
        "1": {
            text: '待收货',
            color: 'green'
        },
        "2": {
            text: '已收货',
            color: 'blue'
        },
        "3": {
            text: '订单完成',//目前没有评价系统 暂时单做订单完成
            color: 'green'
        },
        "4": {
            text: '订单失效',
            color: 'red'
        },
        "5": {
            text: '待付款',
            color: 'red'
        },
        "6": {
            text: '订单完成',//评价完成
            color: 'red'
        },
        
    }
    