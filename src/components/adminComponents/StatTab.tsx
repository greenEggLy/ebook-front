import { Tabs, TabsProps } from "antd";
import { date_back } from "../../utils/DateUtil";
import React, { useEffect, useState } from "react";

interface Props {
  setEarlierDate: any;
  setLaterDate: any;
  isDiy: boolean;
  setIsDiy: any;
}

export const StatTab = ({
  setEarlierDate,
  setLaterDate,
  isDiy,
  setIsDiy,
}: Props) => {
  const [activeKey, setActiveKey] = useState<"1" | "2" | "3">("1");
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `最近7天`,
    },
    {
      key: "2",
      label: `最近30天`,
    },
    {
      key: "3",
      label: `自定义`,
    },
  ];

  useEffect(() => {
    if (isDiy) setActiveKey("3");
  }, [isDiy]);

  const onTabChange = (key: string) => {
    if (key === "1") {
      setActiveKey("1");
      setIsDiy(false);
      setEarlierDate(date_back(6));
      setLaterDate(date_back(-1));
      return;
    }
    if (key === "2") {
      setActiveKey("2");
      setIsDiy(false);
      setEarlierDate(date_back(29));
      setLaterDate(date_back(-1));
      return;
    }
    setActiveKey("3");
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
