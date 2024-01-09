import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { TicketEntity } from './entities/ticket.entity';
import { CreateTicketArgs } from './args/create.ticket.args';
import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { AuthEntity } from 'src/auth/entities/auth.entity';

@Injectable()
export class TicketService {
  constructor(@InjectRepository(TicketEntity) public readonly ticketRepo: Repository<TicketEntity>,
    @InjectRepository(AuthEntity) public readonly authRepo: Repository<AuthEntity>
  ) { }

  async findOneById(id: number, userId: number) {
    if (!id) throw new ConflictException('No ID Found');
    let ticketDetails = await this.ticketRepo.findOne({ where: { id: id }, relations: ['category'] });
    if (ticketDetails === null) {
      throw new ConflictException(`No ticket exists with ${id}`);
    } else {
      if (ticketDetails.user_id !== userId) {
        throw new ConflictException(`Not Authorize to view ticket with ${id}`);
      } else {
        // return ticketDetails
        const todayDate = new Date();
        todayDate.setHours(todayDate.getHours() - 72);
        if (ticketDetails.createdAt < new Date(todayDate.setHours(todayDate.getHours() - 72))) {
          ticketDetails.status = 'closed'
          return await this.ticketRepo.save(ticketDetails);
        }
        return ticketDetails
      }
    }
  }

  async adminReadSingleTicket(id: number) {
    if (!id) throw new ConflictException('No ID Found');
    let ticketDetails = await this.ticketRepo.findOne({ where: { id: id }, relations: ['category'] });
    if (ticketDetails === null) {
      throw new ConflictException(`No ticket exists with ${id}`);
    } else {
      // return ticketDetails
      const todayDate = new Date();
      todayDate.setHours(todayDate.getHours() - 72);
      if (ticketDetails.createdAt < new Date(todayDate.setHours(todayDate.getHours() - 72))) {
        ticketDetails.status = 'closed'
        return await this.ticketRepo.save(ticketDetails);
      }
      return ticketDetails
    }
  }

  async createTicket(createTicketArgs: CreateTicketArgs): Promise<TicketEntity> {
    let ticket: TicketEntity = new TicketEntity();
    ticket.title = createTicketArgs.title
    ticket.priority = createTicketArgs.priority
    ticket.message = createTicketArgs.message
    ticket.user_id = createTicketArgs.user_id
    ticket.category_id = createTicketArgs.category_id
    ticket.ticket_id = 'ticketIdXYZ' + String(Math.random().toFixed(2))
    let ticketSave = await this.ticketRepo.save(ticket);
    return await this.ticketRepo.findOne({ where: { id: ticketSave.id }, relations: ['category'] })
  }

  async getAllTicketsBySingleUser(userId: number) {
    if (!userId) throw new ConflictException(`No User Id Found`);
    let ticketDetails = await this.ticketRepo.find({ where: { user_id: userId }, relations: ['category'] });
    for (const ticketDetail of ticketDetails) {
      const todayDate = new Date();
      todayDate.setHours(todayDate.getHours() - 72);
      if (ticketDetail.createdAt < new Date(todayDate.setHours(todayDate.getHours() - 72))) {
        ticketDetail.status = 'closed'
        await this.ticketRepo.save(ticketDetail);
      }
    }
    return ticketDetails
  }

  async updateStatusClosed(ticketId: number) {
    let ticketDetails = await this.ticketRepo.findOne({ where: { id: ticketId }, relations: ['category'] });
    if (ticketDetails === null) {
      throw new NotFoundException("Ticket with given id doesn't exists");
    } else {
      if (ticketDetails.status === 'closed') {
        throw new ConflictException(`Ticket is already closed`);
      } else {
        ticketDetails.status = 'closed'
        return await this.ticketRepo.save(ticketDetails);
      }
    }
  }

  async getAllClosedTicketsBySingleUser(userId: number) {
    if (!userId) throw new ConflictException(`No User Id Found`);
    let ticketDetails = await this.ticketRepo.find({ where: { user_id: userId, status: 'closed' }, relations: ['category'] });
    return ticketDetails
  }

  async getAllClosedTickets(adminUserId: number) {
    if (!adminUserId) throw new ConflictException('No user Id Found');
    let adminUserDetails = await this.authRepo.findOne({ where: { id: adminUserId } });
    if (adminUserDetails.userPosition === 'admin') {
      let ticketDetails = await this.ticketRepo.find({ where: { status: 'closed' }, relations: ['category'] });
      return ticketDetails
    } else {
      throw new ConflictException(`You are not authorize to view closed tickets`);
    }
  }

  async getAllOpenedTickets(adminUserId: number) {
    if (!adminUserId) throw new ConflictException('No user Id Found');
    let adminUserDetails = await this.authRepo.findOne({ where: { id: adminUserId } });
    if (adminUserDetails.userPosition === 'admin') {
      let ticketDetails = await this.ticketRepo.find({ where: { status: 'open' }, relations: ['category'] });
      // return ticketDetails
      for (const ticketDetail of ticketDetails) {
        const todayDate = new Date();
        todayDate.setHours(todayDate.getHours() - 72);
        if (ticketDetail.createdAt < new Date(todayDate.setHours(todayDate.getHours() - 72))) {
          ticketDetail.status = 'closed'
          await this.ticketRepo.save(ticketDetail);
        }
      }
      let ticketDetailsValue = await this.ticketRepo.find({ where: { status: 'open' }, relations: ['category'] });
      return ticketDetailsValue
    } else {
      throw new ConflictException(`You are not authorize to view open tickets`);
    }
  }
}

