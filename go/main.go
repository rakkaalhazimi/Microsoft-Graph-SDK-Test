package main

import (
	"context"
	"fmt"
	"log"
	"os"

	azidentity "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
	"github.com/joho/godotenv"
	graph "github.com/microsoftgraph/msgraph-sdk-go"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	TENANT_ID := os.Getenv("TENANT_ID")
	CLIENT_ID := os.Getenv("CLIENT_ID")
	REDIRECT_URL := os.Getenv("REDIRECT_URL")

	cred, _ := azidentity.NewInteractiveBrowserCredential(&azidentity.InteractiveBrowserCredentialOptions{
		TenantID:    TENANT_ID,
		ClientID:    CLIENT_ID,
		RedirectURL: REDIRECT_URL,
	})

	graphClient, _ := graph.NewGraphServiceClientWithCredentials(
		cred, []string{"User.Read"})

	results, err := graphClient.Me().Get(context.Background(), nil)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(results)
}
