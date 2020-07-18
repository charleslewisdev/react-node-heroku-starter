import {useCallback} from 'react';
import {useSecurityState} from 'contexts/Security';

const _hasPermission = (permissionKey, {permissions, role}) => {
  if (!permissionKey || !permissions || !Array.isArray(permissions)) {
    return false;
  }
  if (role.name === 'SUPER_ADMIN') {
    return true;
  }
  return !!permissions.includes(permissionKey);
};

const useHasPermission = () => {
  const securityState = useSecurityState();
  // useCallback helps prevent infinite render scenarios
  const memoizedCallback = useCallback(
    (permissionKey) => {
      return _hasPermission(permissionKey, securityState);
    },
    [securityState]
  );
  return memoizedCallback;
};

export default useHasPermission;
