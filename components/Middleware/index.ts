import nookies from 'nookies'
import {TOKEN} from 'constant'
import {apiGetSession} from 'services/auth'

export function unauthPage(ctx: any) {
  return new Promise(resolve => {
    const allCookies = nookies.get(ctx);

    if(allCookies[TOKEN])
      return ctx?.res?.writeHead(302, {
        Location: '/'
      }).end();

    return resolve('unauthorized');
  });
}

export const authPage = async (ctx: any) => {
  return new Promise<{session: {user: any|null|undefined, token: string|null|undefined}}>(async resolve => {
    const allCookies = nookies.get(ctx)
    if (!allCookies[TOKEN]) {
      return ctx?.res?.writeHead(302, {
        Location: `/auth/login?redirect_to=${ctx?.resolvedUrl}`
      }).end()
    }

    let user: any = {}
  
    const res = await apiGetSession(ctx)
    if (res?.success) {
      user = res?.data
    } 

    return resolve({
      session: {
        user,
        token: String(allCookies[TOKEN])
      }
    });
  });
}

export const useSession = async (ctx: any) => {
  return new Promise<{session: {user: any|null|undefined, token: string|null|undefined}}>(async resolve => {
    const allCookies = nookies.get(ctx)
    let user: any = {}
  
    const res = await apiGetSession(ctx)
    if (res?.success) {
      user = res?.data
    } 

    return resolve({
      session: {
        user,
        token: String(allCookies[TOKEN])
      }
    });
  });
}