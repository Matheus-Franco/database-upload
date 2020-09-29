import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '../../../services/ShowProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const show = await showProfile.execute({ user_id });

    return response.json(show);
  }
}

export default ProfileController;
