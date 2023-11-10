import { getUserInfo, getNetworkDetails, isAllowed } from '@stellar/freighter-api';
export { setAllowed as enable } from '@stellar/freighter-api';

let account: string
let enabled: boolean
let network: string
let networkUrl: string
let networkPassphrase: string
let expectedNetwork = "TESTNET" //defaulting to TESTNET, but allowing this value to be changed with setExpectedNetwork

export function setExpectedNetwork(network: string) {
  expectedNetwork = network
}

export function isSignedIn() {
  return enabled && !!account && network === expectedNetwork
}

export function isSignedInToWrongNetwork() {
  return enabled && !!account && network !== expectedNetwork
}

export function freighterIsLocked() {
  return enabled && !account
}

export function getState() {
  return {
    account,
    enabled,
    network,
    networkUrl,
    networkPassphrase,
    isSignedIn: isSignedIn(),
  }
}

type onChangeHandler = (args: {
  account: string
  enabled: boolean
  network: string
  networkUrl: string
  networkPassphrase: string
  isSignedIn: boolean
}) => Promise<void>;

const onChangeHandlers: onChangeHandler[] = [];

export function onChange(handler: onChangeHandler) {
  onChangeHandlers.push(handler);
};

function show(elements: HTMLElement[]) {
  elements.forEach(element => {
    element.style.display = 'block';
    // CSS hack to force opacity transition to work
    setTimeout(() => {
      element.style.opacity = '1';
    }, 1);
  });
}

function hide(elements: HTMLElement[]) {
  elements.forEach(element => {
    element.style.removeProperty('opacity');
    element.style.display = 'none';
  });
}

const signedInElements: HTMLElement[] = Array.from(
  document.querySelectorAll('.ifSignedIn')
);
const signedOutElements: HTMLElement[] = Array.from(
  document.querySelectorAll('.ifSignedOut')
);

export async function refresh(forceUpdate = false) {
  const [
    newUserInfo,
    newIsEnabled,
    newNetworkDetails,
  ] = await Promise.all([
    getUserInfo(),
    isAllowed(),
    getNetworkDetails(),
  ]);
  if (
    forceUpdate ||
    newUserInfo.publicKey !== account ||
    newIsEnabled !== enabled ||
    newNetworkDetails.network !== network ||
    newNetworkDetails.networkUrl !== networkUrl ||
    newNetworkDetails.networkPassphrase !== networkPassphrase
  ) {
    account = newUserInfo.publicKey;
    enabled = newIsEnabled;
    network = newNetworkDetails.network;
    networkUrl = newNetworkDetails.networkUrl;
    networkPassphrase = newNetworkDetails.networkPassphrase;
    const signedIn = isSignedIn();
    await Promise.all(onChangeHandlers.map(fn => fn({
      account,
      enabled,
      network,
      networkUrl,
      networkPassphrase,
      isSignedIn: signedIn,
    })));
    if (signedIn) {
      show(signedInElements);
      hide(signedOutElements);
    } else {
      hide(signedInElements);
      show(signedOutElements);
    }
  }
}

setTimeout(refresh, 1);
setInterval(refresh, 1000);
