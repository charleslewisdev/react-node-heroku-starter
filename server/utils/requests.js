const {models} = require('../utils/sequelize').getSequelize();

const getRouteFromUrl = (url) => {
  return url.substr(url.lastIndexOf('/') + 1);
};

const getUserScopes = async ({user}) => {
  const {applicationId, id, organizationId, Role} = user;
  if (Role && Role.name === 'SUPER_ADMIN') {
    const allApplications = await models.Application.findAll();
    const allOrganizations = await models.Organization.findAll();
    const allApplicationIds = allApplications.map(({id}) => id);
    const allOrganizationIds = allOrganizations.map(({id}) => id);
    return {
      applicationIds: allApplicationIds,
      organizationIds: allOrganizationIds,
    };
  }
  if (organizationId && !applicationId) {
    const applications = await models.Application.findAll({
      where: {organizationId},
    });
    const applicationIds = applications.map(({id}) => id);
    return {
      applicationIds,
      organizationIds: [organizationId],
    };
  }
  if (organizationId && applicationId) {
    return {applicationIds: [applicationId], organizationIds: [organizationId]};
  }
  throw new Error(`Configuration error for User ${id}`);
};

module.exports = {
  getRouteFromUrl,
  getUserScopes,
};
