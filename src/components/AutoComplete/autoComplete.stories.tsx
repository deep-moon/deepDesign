import React from "react";
import AutoComplete, { DataSourceType } from "./autoComplete";
import { ComponentMeta, ComponentStory } from "@storybook/react";
// import mdx from "./button.mdx";

interface GithubUserProps {
  login: string;
  url: string;
}
const AutoCompleteMeta: ComponentMeta<typeof AutoComplete> = {
  title: "AutoComplete",
  id: "AutoComplete",
  component: AutoComplete,
};
export default AutoCompleteMeta;

export const ASimpleComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const lakersWithNumber = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((item) => item.value.includes(query));
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<{ number: number }>;
    return (
      <h2>
        {itemWithNumber.value}: {itemWithNumber.number}
      </h2>
    );
  };
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
      placeholder="输入湖人队球员英文名试试"
    />
  );
};
ASimpleComplete.storyName = "基本的搜索";

export const AsyncComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        const formateItems = items?.slice?.(0, 10)?.map((item: any) => {
          return {
            value: item.login,
            ...item,
          };
        });
        return formateItems;
      });
  };
  const renderOption = (item: DataSourceType) => {
    const userInfo = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <div>name:{userInfo.login}</div>
        <div>url: {userInfo.url}</div>
      </>
    );
  };
  return (
    <AutoComplete
      {...args}
      renderOption={renderOption}
      fetchSuggestions={handleFetch}
      placeholder="输入github用户名"
    />
  );
};
AsyncComplete.storyName = "异步的搜索";
