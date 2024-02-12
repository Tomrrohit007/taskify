import React from 'react';
import { OrgControl } from './_components/org-control';

const LayoutOrganizationId = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default LayoutOrganizationId
