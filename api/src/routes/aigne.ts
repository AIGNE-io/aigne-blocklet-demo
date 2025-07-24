import { AIGNEHubChatModel } from '@aigne/aigne-hub';
import axios from 'axios';
import { joinURL } from 'ufo';

const getAigneHubModelApi = async (url: string) => {
  try {
    const urlObj = new URL(url);
    const appUrl = urlObj.origin;
    const { data: blockletJson } = await axios.get(joinURL(appUrl, '__blocklet__.js?type=json'));
    const { componentMountPoints = [] } = blockletJson || {};

    const aigneHubMountPoint = componentMountPoints.find((item: any) => item.name === 'ai-kit');
    if (!aigneHubMountPoint) {
      throw new Error("The current application doesn't have the AIGNE Hub component installed");
    }

    return joinURL(appUrl, aigneHubMountPoint.mountPoint, 'api/v2/chat');
  } catch (error) {
    throw new Error('Invalid url');
  }
};

export const getAigneConfig = async () => {
  let apiKey: any = {};
  const credential = process.env.BLOCKLET_AIGNE_API_CREDENTIAL;
  if (credential && typeof credential === 'string') {
    apiKey = JSON.parse(credential);
  }
  const baseUrl = await getAigneHubModelApi(process.env.BLOCKLET_AIGNE_API_URL || '');
  return {
    apiKey: apiKey.apiKey,
    url: baseUrl,
    provider: process.env.BLOCKLET_AIGNE_API_PROVIDER,
    model: process.env.BLOCKLET_AIGNE_API_MODEL,
  };
};

export const onTestAigneHub = async (message: string) => {
  const config = await getAigneConfig();
  const model = new AIGNEHubChatModel({
    model: config.model,
    accessKey: config.apiKey,
    url: config.url,
  });

  const result = await model.invoke({
    messages: [{ role: 'user', content: message || 'Hello, world!' }],
  });

  return result;
};
