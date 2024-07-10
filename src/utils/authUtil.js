export const hasPermission = (requiredRole) => {
    const currentUserRole = sessionStorage.getItem("role");
    return currentUserRole===requiredRole;
}
