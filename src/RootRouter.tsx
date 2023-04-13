import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { CartView } from "./views/user_views/CartView";
import { UserView } from "./views/user_views/UserView";
import { BookView } from "./views/user_views/BookView";
import { ErrorView } from "./views/ErrorView";
import { BooksView } from "./views/user_views/BooksView";
import { LoginView, SignupView } from "./views/LoginView";
import { StorageView } from "./views/admin_views/StorageView";
import { OrdersView_admin } from "./views/admin_views/OrdersView_admin";
import { StatView } from "./views/admin_views/StatView";
import { ManUserView } from "./views/admin_views/ManUserView";
import { OrdersView } from "./views/user_views/OrdersView";
import { CheckOrderView } from "./views/user_views/CheckOrderView";
import { SubmitOrderView } from "./views/user_views/SubmitOrderView";

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
