import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { TicketReplyEntity } from './entities/ticket-reply.entity';
import { CreateTicketReplyArgs } from './args/create-reply.ticket.args';
import { Injectable, ConflictException } from "@nestjs/common";
import { TicketEntity } from 'src/ticket/entities/ticket.entity';

@Injectable()
export class TicketReplyService {
  constructor(
    @InjectRepository(TicketReplyEntity) public readonly ticketReplyRepo: Repository<TicketReplyEntity>,
    @InjectRepository(TicketEntity) public readonly ticketRepo: Repository<TicketEntity>
  ) { }

  async findOneById(id: number) {
    if (!id) throw new ConflictException('No ID Found');
    let ticketDetails = await this.ticketReplyRepo.findOne({ where: { id: id }, relations: ['ticket', 'replied_by'] });
    if (ticketDetails === null) {
      throw new ConflictException(`No ticket exists with ${id}`);
    } else {
      return ticketDetails
    }
  }

  async createTicketReply(createTicketReplyArgs: CreateTicketReplyArgs): Promise<TicketReplyEntity> {
    let ticket: TicketReplyEntity = new TicketReplyEntity();
    ticket.ticket_id = createTicketReplyArgs.ticket_id
    ticket.replied_by_id = createTicketReplyArgs.replied_by_id
    ticket.message = createTicketReplyArgs.message
    let ticketDetails = await this.ticketRepo.findOne({ where: { id: createTicketReplyArgs.ticket_id }, relations: ['category'] });
    ticketDetails.duration = new Date()
    ticketDetails.createdAt = new Date()
    await this.ticketRepo.save(ticketDetails);
    let ticketReplySave = await this.ticketReplyRepo.save(ticket);
    return await this.ticketReplyRepo.findOne({ where: { id: ticketReplySave.id }, relations: ['ticket', 'replied_by'] })
  }

  async getAllRepliesBySingleTicket(ticket_id: number) {
    if (!ticket_id) throw new ConflictException(`No Ticket Id Found`);
    let ticketDetails = await this.ticketReplyRepo.find({ where: { ticket_id: ticket_id }, relations: ['ticket', 'replied_by'] });
    return ticketDetails
  }
}

