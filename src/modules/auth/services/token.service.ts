import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  genAccessToken(uid: number) {
    const payload: JwtPayload = {
      uid,
      roles: [],
      pv: 1,
    }
    return this.jwtService.sign(payload)
  }
}
