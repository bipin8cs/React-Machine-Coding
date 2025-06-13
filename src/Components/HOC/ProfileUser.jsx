import WithUser from "./WithUser"
const UserProfile = ({ user }) => <h3>Hello, {user.name}!</h3>;
const ProfileWithUser = WithUser(UserProfile);
export default ProfileWithUser;