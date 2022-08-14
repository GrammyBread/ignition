export const minifyProps = (props:string) => {
    let smallProp = props.replace(/(?:\r\n|\r|\n)/g, '');
    return smallProp;
}