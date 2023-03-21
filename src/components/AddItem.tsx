import "../css/BookView.css";
import { Button } from "antd";

interface AddItem {
  stock: number;
  item_num: number;
  set_item_num: any;
}

export default function AddItem({ stock, item_num, set_item_num }: AddItem) {
  function set_num(text: string) {
    if (!isNaN(Number(text)) && Number(text) >= 0) set_item_num(Number(text));
  }

  const canBuy = stock > 0;

  return (
    <div className={"buy_box"}>
      <div className={"num"}>
        <Button
          className={"num_minus"}
          onClick={() =>
            set_item_num(item_num - 1 >= 0 ? item_num - 1 : item_num)
          }
        >
          {"-"}
        </Button>
        <input
          className={"num_input"}
          // style={{ width: 50 }}
          id={"input_num"}
          value={item_num.toString()}
          onChange={(e) => set_num(e.target.value)}
        />
        <Button
          className={"num_add"}
          onClick={() => set_item_num(item_num + 1)}
        >
          {"+"}
        </Button>
      </div>
      <div className={"buttons"}>
        <Button
          className={"to_cart"}
          onClick={() => console.log("add to chart")}
          disabled={!canBuy}
        >
          {"加入购物车"}
        </Button>
        <Button
          className={"buy_now"}
          onClick={() => console.log("purchase now")}
          disabled={!canBuy}
        >
          {"立即购买"}
        </Button>
      </div>
    </div>
  );
}
