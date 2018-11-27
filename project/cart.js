/*等待文档加载完毕后执行*/
$(function()
{//1. 全选与取消全选
	countItem()
	var isTrue = false;
	$("#checkall").click(function()
	{//更改状态标识
		isTrue = !isTrue;
		if(isTrue){
			$("[name=check]").prop("checked","true");
			countItem()
		}else{
			$("[name=check]").removeAttr("checked");
			countItem()
			
		};
	}); 
	//2. 反选
	/*
	onchange 事件
	输入框监听, 判断两次输入是否一致
	按钮监听, 选中与取消状态改变
	*/
	$("[name=check]").change(function()
	{//判断商品复选框, 未被选中的数量, <=0, 说明全选
	//:eq :not()
	//eq(index) 根据下标获取元素
	//not("") 获取元素, 否定条件
	//input:checked 匹配被选中的输入框
	//size() 获取数组长度, 元素个数
		var isAll = $("[name=check]").not("input:checked").size() <= 0;
		if(isAll){
			//修改全选按钮
			$("#checkall").prop("checked","true");
			//修改全选状态标识
			isTrue = true;
			countItem()
		}else{
			$("#checkall").removeAttr("checked")
			isTrue = false;
			countItem()
		}
	});
	//3. 数量加减, 价格联动
	$(".decrement").click(function()
	{//判断当前数量是否大于1, 如果大于1 做--
		if($(this).next().val() > 1){
			//值--
			var value = $(this).next().val();
			$(this).next().val(--value)
			var priceStr = $(this).parent().prev().html();
			//[start,end)
			var price = Number(priceStr.substring(1,priceStr.length));
			//修改总价
			$(this).parent().next().html("<b>&yen;"+price * value+"</b>");
			countItem()
		}
	});
	$(".increment").click(function()
	{
		var value = $(this).prev().val();
		$(this).prev().val(++value)
		//价格联动
		//获取单价 &yen;188
		var priceStr = $(this).parent().prev().html();
		//[start,end)
		var price = Number(priceStr.substring(1,priceStr.length));
		//修改总价
		$(this).parent().next().html("<b>&yen;"+price * value+"</b>");
		countItem()
	});
	//blur表示失去焦点
	$("[name=countText]").blur(function()
	{//获取输入的值, 更改总价
		var count = Number($(this).val());
		var priceStr = $(this).parent().prev().html();
		//[start,end)
		var price = Number(priceStr.substring(1,priceStr.length));
		//修改总价
		$(this).parent().next().html("<b>&yen;"+price * count+"</b>");
		countItem()
	});
	//4. 移除商品
	$(".action a").click(function()
	{//删除整条商品记录 .g-item
	//$(this).parent().parent()
		$(this).parents(".g-item").remove();
	});
	//5. 工具栏中数量与价格的联动
	function countItem()
	{
		console.log("123")
		var sum = 0;//勾选的商品数量
		var priceSum = 0//对应的总价格
		/*
		1. 遍历所有被勾选的元素
		2. 获取被勾选元素中的数量与小计
		3. 累加并显示在工具栏
		*/
	   $("[name=check]:checked").each(function()
	   {
		   sum += Number($(this).parents(".g-item").find('[name=countText]').val());
		   var priceStr = $(this).parents(".g-item").find(".t-sum b").html();
		   var price = Number(priceStr.substring(1,priceStr.length))
		   priceSum += price;
	   });
	   $(".submit-count span").html(sum);
	   $(".submit-price span").html("&yen;"+priceSum);
	};
});
