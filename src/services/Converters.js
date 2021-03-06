import {StringValueValidator} from "./Validators";

const convertParcelFromApi = (parcel) => ({
    ...parcel,
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
    ...grapevine,
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
    ...harvest,
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
    ...box,
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
    ...ingredient,
    id: ingredient.id && ('' + ingredient.id),
    name: ingredient.name || '',
    info: ingredient.info || '',
    type: ingredient.type || '',
    amount: ingredient.amount || '',
});

const convertIngredientToApi = (ingredient) => ({
    ...ingredient,
    id: ingredient.id || null,
    name: ingredient.name || null,
    info: ingredient.info || null,
    type: ingredient.type || null,
    amount: ingredient.amount || null,
    appliedDate: ingredient.appliedDate ? convertDateTimeToApi(ingredient.appliedDate) : null,

});

const convertWineFromApi = (wine) => ({
    ...wine
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

const convertTankFromApi = (tank) => ({
    ...tank
});

const convertGrapeColor = (color) => {
    if (color === 'WHITE')
    {
        return 'grapevine.GRAPE_COLOR_WHITE';
    }
    else
    {
        return 'grapevine.GRAPE_COLOR_RED';
    }
};

const convertDateTimeFromApi = (dateTime) => {
    let result = '';
    if (dateTime)
    {
        try
        {
            const dateTimeBuffer = dateTime?.split("T");
            const date = dateTimeBuffer[0];
            const dateBuffer = date?.split("-");
            const finalDate = dateBuffer?.[2] + "." + dateBuffer?.[1] + "." + dateBuffer?.[0];
            const timeBuffer = dateTimeBuffer[1].split(":");
            const time = timeBuffer[0] + ':' + timeBuffer[1];
            result = `${finalDate} (${time})`;
        }
        catch (e)
        {
            console.error('convertDateTimeFromApi', dateTime, e);
        }
    }
    return result;
};

const convertDateFromApi = (date) => {
    let result = '';
    if (date)
    {
        try
        {
            const dateTimeBuffer = date?.split("T");
            const newDate = dateTimeBuffer?.[0];
            const dateBuffer = newDate?.split("-");
            result = dateBuffer?.[2] + "." + dateBuffer?.[1] + "." + dateBuffer?.[0];
        }
        catch (e)
        {
            console.error('convertDateFromApi', date, e);
        }
    }
    return result;
};

const getAvatarUrl = (avatar) => {
    const url = "/ajax/avatar/";
    const avatarId = avatar && avatar.id;
    return avatarId && (url + avatarId)
};

const convertPrincipalFromApi = (principal) => {
    principal.avatarUrl = getAvatarUrl(principal.avatar) || 'img/user/02.jpg';
    principal.hasAccess = (path) => (principal.realms?.find(r => r.startsWith(path)));
    principal.lock = false;

    return principal;
};

const convertUserFromApi = (user, account) => {
    user.id = '' + user.id;
    user.created = (user.created && convertDateTimeFromApi(user.created)) || '';
    user.lastLogin = (user.lastLogin && convertDateTimeFromApi(user.lastLogin)) || '';
    user.avatarUrl = getAvatarUrl(user.avatar) || 'img/user/02.jpg';
    user.account = account;
    user.permissions = (user.roles || []).includes('SUPERUSER') ? [{
        value: 'SUPERUSER',
        label: 'wszystkie uzgodnienia'
    }] : [];

    return user;
};

const convertAccountFromApi = (account) => {
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

const convertDateTimeToApi = (date) => {
    const d = new Date(date);
    const timezoneOffset = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes() - timezoneOffset);
    return d;
}

const convertEventToApi = (event) => ({
    id: event.id || null,
    name: event.name || null,
    type: event.type || null,
    info: event.info || null,
    startingDate: event.startingDate ? convertDateTimeToApi(event.startingDate) : null,
    endingDate: event.endingDate ? convertDateTimeToApi(event.endingDate) : null,
    waste: event.waste || null,
});

const checkBoolean = (value) => {
    return value === false ? false : value || ''
};

export const FromApiConverter = {
    convertParcelList: (list) => list.map(convertParcelFromApi),
    convertTankList: (list) => list.map(convertTankFromApi),
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
    convertGrapeColor: convertGrapeColor,
    convertDateTime: convertDateTimeFromApi,
    convertDate: convertDateFromApi
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
    convertEvent: convertEventToApi,
    convertDate: convertDateTimeToApi
};