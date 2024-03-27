import { auth, currentUser } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

type Props = {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
};

import React from 'react';
import { db } from './db';

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error('User not found');
    }
    const { action, entityId, entityTitle, entityType } = props;

    await db.auditLog.create({
      data: {
        action,
        orgId,
        entityId,
        entityType,
        entityTitle,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + ' ' + user?.lastName,
      },
    });
  } catch (error) {
    console.log('Audit log error', error);
  }
};
