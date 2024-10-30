import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Algo Trainer" },
    { name: "description", content: "Train your students" },
  ];
};

export default function Index() {
  return (
    <>
    test
    </>
  );
}
