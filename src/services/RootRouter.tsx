import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomeView } from "../views/HomeView";
import { CartView } from "../views/CartView";
import { UserView } from "../views/UserView";
import { BookView } from "../views/BookView";
import { ErrorView } from "../views/ErrorView";
import { BooksView } from "../views/BooksView";
import { LoginView, SignupView } from "../views/LoginView";
import { User } from "../Interface";
import { StorageView } from "../views/StorageView";
import { OrdersView_admin } from "../views/OrdersView_admin";
import { Statistic } from "antd";
import { StatView } from "../views/StatView";
import { ManUserView } from "../views/ManUserView";
import { OrdersView } from "../views/OrdersView";
import { CheckOrderView } from "../views/CheckOrderView";
import { SubmitOrderView } from "../views/SubmitOrderView";

interface Props {
  user: User;
}

export const RootRouter = ({ user }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<HomeView user={user} />}
          children={[
            <Route index={true} path={"/booklist"} element={<BooksView />} />,
            <Route path={"/cart"} element={<CartView user={user} />} />,
            <Route
              path={"/checkOrder"}
              element={<CheckOrderView goods={user.cart} />}
            />,
            <Route path={"/submitOrder"} element={<SubmitOrderView />} />,
            <Route path={"/order"} element={<OrdersView user={user} />} />,
            <Route path={"/user"} element={<UserView user={user} />} />,
            <Route path={"/book/:id"} element={<BookView />} />,
            <Route path={"/admin/storage"} element={<StorageView />} />,
            // eslint-disable-next-line react/jsx-pascal-case
            <Route path={"/admin/orders"} element={<OrdersView_admin />} />,
            <Route path={"/admin/statistics"} element={<StatView />} />,
            <Route path={"/admin/manuser"} element={<ManUserView />} />,
          ]}
        />
        <Route path={"/login"} element={<LoginView />} />
        <Route path={"/signup"} element={<SignupView />} />
        <Route path={"*"} element={<ErrorView />} />
      </Routes>
    </BrowserRouter>
  );
};
