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

export const RootRouter = () => {
  return (
    <Routes>
      <Route index={true} path={"/login"} element={<LoginView />} />
      <Route
        path={"/"}
        element={<HomeView />}
        children={[
          <Route index={true} path={"/booklist"} element={<BooksView />} />,
          <Route path={"/cart"} element={<CartView />} />,
          <Route path={"/checkOrder"} element={<CheckOrderView />} />,
          <Route path={"/submitOrder"} element={<SubmitOrderView />} />,
          <Route path={"/order"} element={<OrdersView />} />,
          <Route path={"/user"} element={<UserView />} />,
          <Route path={"/book/:id"} element={<BookView />} />,
          <Route path={"/admin/storage"} element={<StorageView />} />,
          // eslint-disable-next-line react/jsx-pascal-case
          <Route path={"/admin/orders"} element={<OrdersView_admin />} />,
          <Route path={"/admin/statistics"} element={<StatView />} />,
          <Route path={"/admin/manuser"} element={<ManUserView />} />,
        ]}
      />
      <Route path={"/signup"} element={<SignupView />} />
      <Route path={"*"} element={<ErrorView />} />
    </Routes>
  );
};
