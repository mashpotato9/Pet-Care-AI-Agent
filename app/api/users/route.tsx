import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest) {
    try {
        const user = await currentUser();
        // check if user exists
        const users = await db.select().from(usersTable)
        // @ts-ignore
        .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
        if(users?.length == 0){
            // create user
            const result = await db.insert(usersTable).values({
                // @ts-ignore
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                credits: 10,
                createdAt: new Date(),
                // @ts-ignore
            }).returning({usersTable})
            return NextResponse.json(result[0]?.usersTable);
        }
        // return user info
        return NextResponse.json(users[0])

    } catch (error) {
        return NextResponse.json(error)
    }
}