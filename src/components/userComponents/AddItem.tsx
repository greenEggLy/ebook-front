import "../../css/BookView.css";
import {Button, message} from "antd";
import {AddCartItem} from "../../services/CartService";
import {createOrderDirectly} from "../../services/OrderService";
import {useNavigate} from "react-router-dom";
import {useLayoutEffect, useRef, useState} from "react";

interface Props {
    user_id: number;
    book_id: number;
    stock: number;
    item_num: number;
    set_item_num: any;
}

export const AddItem = ({
                            user_id,
                            book_id,
                            stock,
                            item_num,
                            set_item_num,
                        }: Props) => {
    const navigation = useNavigate();
    const canBuy = stock > 0;

    const ws = useRef<WebSocket | null>(null);
    const [wsMsg, setWsMsg] = useState<string>("");
    useLayoutEffect(() => {
        // alert("useLayoutEffect");
        ws.current = new WebSocket(`ws://localhost:8080/transfer/${user_id}`);
        ws.current.onopen = () => {
            message.info("ws opened");
        };
        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            message.info(data.goods);
            // }
        };
        ws.current.onclose = () => {
            console.log("ws closed");
        };
        ws.current.onerror = (e) => {
            console.log(e);
        };
        return () => {
            ws.current?.close();
        };
    }, [ws]);

    function set_num(text: string) {
        if (!isNaN(Number(text)) && Number(text) >= 0) set_item_num(Number(text));
    }


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
                    onClick={() => {
                        AddCartItem(user_id, book_id, item_num)
                            .then(() => message.info("加购成功", 0.5))
                            .then(() => set_num("0"));
                    }}
                    disabled={!canBuy || !item_num}
                >
                    {"加入购物车"}
                </Button>
                <Button
                    className={"buy_now"}
                    onClick={() => {
                        createOrderDirectly(user_id, book_id, item_num).then((msg) => {
                            if (!msg.status)
                                message
                                    .success("订单提交成功", 0.5)
                                    .then(() => navigation("/submitOrder"));
                            else message.error(msg.msg, 0.5);
                        });
                    }}
                    disabled={!canBuy || !item_num}
                >
                    {"立即购买"}
                </Button>
            </div>
        </div>
    );
};
