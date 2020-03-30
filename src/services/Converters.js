import {baseApiUrl} from "../config";
import {StringValueValidator} from "./Validators";

const convertParcelFromApi = (parcel) => ({
  id: parcel.id && ('' + parcel.id),
  country: parcel.country || '',
  city: parcel.city || '',
  zipCode: parcel.zipCode || '',
  district: parcel.district || '',
  area: parcel.area || '',
  registrationNumber: parcel.registrationNumber || '',
  grapevines: parcel.grapevines || [],
});

const convertParcelToApi = (parcel) => ({
  id: parcel.id || null,
  country: parcel.country || null,
  city: parcel.city || null,
  zipCode: parcel.zipCode || null,
  district: parcel.district || null,
  area: parcel.area || null,
  registrationNumber: parcel.registrationNumber || null,
  grapevines: parcel.grapevines || null,

});

const convertGrapevineFromApi = (grapevine) => ({
  id: grapevine.id && ('' + grapevine.id),
  name: grapevine.name || '',
  numberOfPlants: grapevine.numberOfPlants || '',
  area: grapevine.area || '',
  parcels: (grapevine.parcels && FromApiConverter.convertParcelList(grapevine.parcels)) || [],
  yearOfPlanting: grapevine.yearOfPlanting || '',
  grapeColor: grapevine.grapeColor || '',
  wines: grapevine.wines || [],
});

const convertGrapevineToApi = (grapevine) => ({
  id: grapevine.id || null,
  name: grapevine.name || null,
  numberOfPlants: grapevine.numberOfPlants || null,
  area: grapevine.area || null,
  parcels: grapevine.parcels || null,
  yearOfPlanting: grapevine.yearOfPlanting || null,
  grapeColor: grapevine.grapeColor || null,
  wines: grapevine.wines || null,

});

const convertHarvestFromApi = (harvest) => ({
  id: harvest.id && ('' + harvest.id),
  grapevine: harvest.grapevine || {},
  dateOfHarvest: harvest.dateOfHarvest || '',
  weightOfGrapes: harvest.weightOfGrapes || '',
  amountOfMust: harvest.amountOfMust || '',
  amountOfWaste: harvest.amountOfWaste || '',
  box: harvest.box || {},
  boxWithGrapes: harvest.boxWithGrapes || [],
  boxesCount: harvest.boxesCount || '',
  weightOfEveryEmptyBox: harvest.weightOfEveryEmptyBox || '',
  allDisposedToWine: checkBoolean(harvest.allDisposedToWine)
});

const convertHarvestToApi = (harvest) => ({
  id: harvest.id || null,
  grapevine: harvest.grapevine || null,
  dateOfHarvest: harvest.dateOfHarvest || null,
  weightOfGrapes: harvest.weightOfGrapes || null,
  amountOfMust: harvest.amountOfMust || null,
  amountOfWaste: harvest.amountOfWaste || null,
  box: harvest.box && StringValueValidator.isNotBlank(harvest.box.weightOfFullBox) ? harvest.box : null,
  weightOfEveryEmptyBox: harvest.weightOfEveryEmptyBox || null,
  allDisposedToWine: harvest.allDisposedToWine || null,

});

const convertBoxFromApi = (box) => ({
  id: box.id && ('' + box.id),
  weightOfEmptyBox: box.weightOfEmptyBox || '',
  weightOfFullBox: box.weightOfFullBox || '',
});

const convertBoxToApi = (box) => ({
  id: box.id || null,
  weightOfEmptyBox: box.weightOfEmptyBox || null,
  weightOfFullBox: box.weightOfFullBox || null,
});

const convertIngredientFromApi = (ingredient) => ({
  id: ingredient.id && ('' + ingredient.id),
  name: ingredient.name || '',
  info: ingredient.info || '',
  type: ingredient.type || '',
  amount: ingredient.amount || '',
});

const convertIngredientToApi = (ingredient) => ({
  id: ingredient.id || null,
  name: ingredient.name || null,
  info: ingredient.info || null,
  type: ingredient.type || null,
  amount: ingredient.amount || null,
});

const convertWineFromApi = (wine) => ({
  id: wine.id && ('' + wine.id),
  name: wine.name || '',
  startDate: wine.startDate || '',
  tankNumber: wine.tankNumber || '',
  tankCapacity: wine.tankCapacity || '',
  liters: wine.liters || '',
  harvest: wine.harvest || {},
  ingredients: wine.ingredients || [],
});

const convertWineToApi = (wine) => ({
  id: wine.id || null,
  name: wine.name || null,
  startDate: wine.startDate || null,
  tankNumber: wine.tankNumber || null,
  tankCapacity: wine.tankCapacity || null,
  liters: wine.liters || null,
  harvest: wine.harvest || null,
});

const convertGrapeColor = (color) =>
{
  if (color === 'WHITE')
  {
    return 'grapevine.GRAPE_COLOR_WHITE';
  }
  else
  {
    return 'grapevine.GRAPE_COLOR_RED';
  }
};

const convertDateTimeFromApi = (dateTime) =>
{
  let result = '';
  if (dateTime)
  {
    try
    {
      const dateTimeBuffer = dateTime && dateTime.split("T");
      const date = dateTimeBuffer[0];
      const timeBuffer = dateTimeBuffer[1].split(":");
      const time = timeBuffer[0] + ':' + timeBuffer[1];
      result = `${date} (${time})`;
    }
    catch (e)
    {
      console.error('convertDateTimeFromApi', dateTime, e);
    }
  }
  return result;
};

const getAvatarUrl = (avatar) =>
{
  const url = baseApiUrl + "/ajax/avatar/";
  const avatarId = avatar && avatar.id;
  return avatarId && (url + avatarId)
};

const convertPrincipalFromApi = (principal) =>
{
  principal.avatarUrl = getAvatarUrl(principal.avatar) || '/images/fa-user-solid.png';
  principal.hasAccess = (path) => (principal.realms.find(r => r.startsWith(path)));
  principal.lock = false;

  return principal;
};

const convertUserFromApi = (user, account) =>
{
  user.id = '' + user.id;
  user.created = (user.created && convertDateTimeFromApi(user.created)) || '';
  user.lastLogin = (user.lastLogin && convertDateTimeFromApi(user.lastLogin)) || '';
  user.avatarUrl = getAvatarUrl(user.avatar) || '/images/fa-user-regular.png';
  user.account = account;
  user.permissions = (user.roles || []).includes('SUPERUSER') ? [{value: 'SUPERUSER', label: 'wszystkie uzgodnienia'}] : [];

  return user;
};

const convertAccountFromApi = (account) =>
{
  account.id = '' + account.id;
  account.created = (account.created && convertDateTimeFromApi(account.created)) || '';
  account.description = account.description || '';
  account.users = (account.users || []).map((user) => convertUserFromApi(user, account));

  return account;
};

const convertAccountToApi = (account) => ({
  name: account.name,
  description: account.description,
});

const convertUserToApi = (user) => ({
  name: user.name || null,
  login: user.login || null,
  permissions: (user.permissions || []).map((p) => (p.value)),
});

const checkBoolean = (value) =>
{
  return value === false ? false : value || ''
};

export const FromApiConverter = {
  convertParcelList: (list) => list.map(convertParcelFromApi),
  convertParcel: convertParcelFromApi,
  convertGrapevine: convertGrapevineFromApi,
  convertGrapevineList: (list) => list.map(convertGrapevineFromApi),
  convertHarvest: convertHarvestFromApi,
  convertHarvestList: (list) => list.map(convertHarvestFromApi),
  convertBox: convertBoxFromApi,
  convertBoxList: (list) => list.map(convertBoxFromApi),
  convertIngredient: convertIngredientFromApi,
  convertIngredientList: (list) => list.map(convertIngredientFromApi),
  convertWine: convertWineFromApi,
  convertWineList: (list) => list.map(convertWineFromApi),
  convertAccount: convertAccountFromApi,
  convertAccountList: (list) => list.map(convertAccountFromApi),
  convertUserList: (list) => list.map(convertUserFromApi),
  convertPrincipal: convertPrincipalFromApi,
  convertGrapeColor: convertGrapeColor
};

export const ToApiConverter = {
  convertParcel: convertParcelToApi,
  convertGrapevine: convertGrapevineToApi,
  convertHarvest: convertHarvestToApi,
  convertBox: convertBoxToApi,
  convertIngredient: convertIngredientToApi,
  convertWine: convertWineToApi,
  convertAccount: convertAccountToApi,
  convertUser: convertUserToApi,

};