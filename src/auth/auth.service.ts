import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'super-secret',
      });
    } catch {
      return null;
    }
  }

  // Helper to generate a token for testing
  async generateToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET || 'super-secret',
      expiresIn: '1h',
    });
  }
}
