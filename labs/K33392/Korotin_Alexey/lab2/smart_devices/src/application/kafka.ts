import {Consumer, EachMessagePayload, Kafka, KafkaConfig} from "kafkajs";
import sequelize from "../infrastructure/persistence/db";
import {AccountModel} from "../infrastructure/persistence/account";

const brokerUrl: string = process.env['app.brokerUrl'] ?? "localhost:29092";

const kafkaConfig: KafkaConfig = {brokers: [brokerUrl]}
const kafka = new Kafka(kafkaConfig)


class ConsumerSingleton {

    private static instance: Consumer;

    private constructor() {
    }

    public static async getInstance(): Promise<Consumer> {
        if (!this.instance) {
            this.instance = kafka.consumer({ groupId: 'smart_device_group' });
            await this.instance.connect();
        }

        return Promise.resolve(this.instance);
    }
}

const userCreatedCallback = async (message: string) => {
    const properties = JSON.parse(message);
    const repository = sequelize.getRepository(AccountModel);

    await repository.create(properties);
}


export const bootstrapKafka = async () => {
    const consumer = await ConsumerSingleton.getInstance();
    await consumer.subscribe({ topic: 'AccountCreatedEvent', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({message}: EachMessagePayload) => {
            const value = message.value?.toString() as string;
            await userCreatedCallback(value);
        }
    })
}
