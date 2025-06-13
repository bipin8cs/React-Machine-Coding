function WithUser(WrappedComponent) {

    //const UserProfile = ({ user }) => <h3>Hello, {user.name}!</h3>;
    return function (props) {
        const user = { name: "Bipina", role: "Admin" }; // Simulated context data
        //Here you can modify the component and  return your new component
        return <WrappedComponent user={user} {...props} />;
    };
}
export default WithUser