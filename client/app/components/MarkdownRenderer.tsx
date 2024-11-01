import { Component } from "react";
import Markdown, { Components, ExtraProps } from "react-markdown";

type HeadingProps = React.ClassAttributes<HTMLHeadingElement> &
  React.HTMLAttributes<HTMLHeadingElement> &
  ExtraProps;

const H1 = ({ ...props }: HeadingProps) => {
  return <p className="text-4xl font-bold" {...props}></p>;
};

const H2 = ({ ...props }: HeadingProps) => {
  return <p className="text-3xl font-semibold" {...props}></p>;
};

const H3 = ({ ...props }: HeadingProps) => {
  return <p className="text-2xl font-semibold" {...props}></p>;
};

const H4 = ({ ...props }: HeadingProps) => {
  return <p className="text-xl font-semibold" {...props}></p>;
};

const H5 = ({ ...props }: HeadingProps) => {
  return <p className="text-lg font-semibold" {...props}></p>;
};

const H6 = ({ ...props }: HeadingProps) => {
  return <p className="text-sm font-semibold" {...props}></p>;
};

const Image = ({ ...props }: ExtraProps) => {
  return <img {...props} className="w-20" />;
};

const renderComponents: Components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Image,
};

const MarkdownRenderer = ({ children }: { children: string }) => {
  return <Markdown components={renderComponents}>{children}</Markdown>;
};

export default MarkdownRenderer;
