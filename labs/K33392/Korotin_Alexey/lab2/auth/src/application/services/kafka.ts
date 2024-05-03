import {Kafka, KafkaConfig, Producer} from 'kafkajs';
import {DomainEvent, DomainEvents} from "../../domain/event/DomainEvent";
import {Account} from "../../domain/account/Account";
import {Entity} from "../../domain/meta";

const brokerUrl: string = process.env['app.brokerUrl'] ?? "localhost:29092";

const kafkaConfig: KafkaConfig = {brokers: [brokerUrl]}
const kafka = new Kafka(kafkaConfig)

class ProducerSingleton {

    private static instance: Producer;

    private constructor() {
    }

    public static async getInstance(): Promise<Producer> {
        if (!this.instance) {
            this.instance = kafka.producer();
            await this.instance.connect();
        }

        return Promise.resolve(this.instance);
    }
}


const addEventListeners = async () => {
    const producer: Producer = await ProducerSingleton.getInstance();

    DomainEvents.register(async (e: DomainEvent<Account>) => {
        const account = e.entity;
        const payload = {
            id: account.id,
            email: account.email.value,
            role: account.role,
            status: account.status

        }
        await producer.send({
            topic: 'AccountCreatedEvent',
            messages: [{
                value: JSON.stringify(payload)
            }]
        });
    }, 'AccountCreatedEvent');
}


export const bootstrapKafka = async () => {
    const admin = kafka.admin();
    await admin.connect();

    await admin.createTopics({
        topics:[{
            topic: "UserCreatedEvent"
        }]
    });

    await addEventListeners().then(() => console.log("Event listeners added"));
}