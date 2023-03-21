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
import { OrdersView } from "../views/OrdersView";
import { Statistic } from "antd";
import { StatView } from "../views/StatView";
import { ManUserView } from "../views/ManUserView";

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
            <Route path={"/user"} element={<UserView user={user} />} />,
            <Route path={"/book/:id"} element={<BookView />} />,
            <Route path={"/admin/storage"} element={<StorageView />} />,
            <Route path={"/admin/orders"} element={<OrdersView />} />,
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
