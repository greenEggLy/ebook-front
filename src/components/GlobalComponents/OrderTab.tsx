import React, { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { date_back } from "../../utils/DateUtil";

interface Props {
  setEarlierDate: any;
  setLaterDate: any;
  isDiy: boolean;
  setIsDiy: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderTab = ({
  setEarlierDate,
  setLaterDate,
  isDiy,
  setIsDiy,
  setShowAll,
}: Props) => {
  const [activeKey, setActiveKey] = useState<"1" | "2" | "3" | "4">("1");
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "全部",
    },
    {
      key: "2",
      label: `最近7天`,
    },
    {
      key: "3",
      label: `最近30天`,
    },
    {
      key: "4",
      label: `自定义`,
    },
  ];

  useEffect(() => {
    if (isDiy) setActiveKey("4");
  }, [isDiy]);

  const onTabChange = (key: string) => {
    if (key === "1") {
      setActiveKey(key);
      setIsDiy(false);
      setShowAll(true);
      return;
    }
    if (key === "2") {
      setActiveKey(key);
      setIsDiy(false);
      setShowAll(false);
      setEarlierDate(date_back(6));
      setLaterDate(date_back(-1));
      return;
    }
    if (key === "3") {
      setActiveKey(key);
      setShowAll(false);
      setIsDiy(false);
      setEarlierDate(date_back(29));
      setLaterDate(date_back(-1));
      return;
    }
    setShowAll(false);
    setActiveKey("4");
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        onChange={onTabChange}
        activeKey={activeKey}
      />
    </div>
  );
};
