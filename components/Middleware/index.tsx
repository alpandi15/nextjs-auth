import nookies, {destroyCookie} from 'nookies'
import {TOKEN} from 'constant'
import {apiGetSession} from 'services/auth'

export function unauthPage(ctx: any) {
  return new Promise(async resolve => {
    // const allCookies = nookies.get(ctx);

    // if(allCookies[TOKEN]) {
    //   return ctx?.res?.writeHead(302, {
    //     Location: '/'
    //   }).end();
    // }

    const res = await apiGetSession(ctx)
    if (!res?.success) {
      console.log('Unauthorize ', res);
      destroyCookie({}, TOKEN)
      return resolve('unauthorized');
      // return ctx?.res?.writeHead(302, {
      //   Location: `/auth/login?redirect_to=${ctx?.resolvedUrl}`
      // }).end()
    } 

    return ctx?.res?.writeHead(302, {
      Location: '/'
    }).end();
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

    const res = await apiGetSession(ctx)
    if (!res?.success) {
      return ctx?.res?.writeHead(302, {
        Location: `/auth/login?redirect_to=${ctx?.resolvedUrl}`
      }).end()
    } 

    return resolve({
      session: {
        user: res?.data,
        token: allCookies[TOKEN] || null
      }
    });
  });
}

export const useSession = async (ctx: any) => {
  return new Promise<{session: {user: any|null|undefined, token: string|null|undefined}}>(async resolve => {
    const allCookies = nookies.get(ctx)
    let user: any = null
  
    const res = await apiGetSession(ctx)
    if (res?.success) {
      user = res?.data
    } 

    return resolve({
      session: {
        user,
        token: allCookies[TOKEN] || null
      }
    });
  });
}