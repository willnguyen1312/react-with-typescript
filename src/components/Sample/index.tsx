import React from "react";

const Child = ({ onClick }: any) => <div onClick={onClick}>Child</div>;

interface ParentProps {
  render: React.ReactNode;
}

const callAll = (funcs: any[]) => () => funcs.forEach(func => func());

class Parent extends React.Component<ParentProps> {
  componentDidMount = () => console.log("Parent2");
  render() {
    const { render } = this.props;
    const content =
      React.isValidElement(render) &&
      React.cloneElement(render, {
        // @ts-ignore
        onClick: callAll([render.props.onClick, () => console.log("parent")])
      });
    return content;
  }
}

class Sample extends React.Component {
  componentDidMount = () => console.log("Parent1");
  render() {
    return <Parent render={<Child onClick={() => console.log("child")} />} />;
  }
}

export default Sample;
