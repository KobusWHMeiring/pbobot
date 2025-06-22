from django.shortcuts import render
from django.http import JsonResponse
import json

# Create your views here.
def structure_selector_view(request):
    """
    Prepares the context and configuration for the single-page
    Structure Selector tool.
    """
    app_config = {
        'details': {
            'NPC': {
                'fullName': 'Non-Profit Company (NPC)',
                'description': 'An NPC is a formal legal entity registered with the CIPC. It offers the strongest liability protection for its founders (directors).',
                'pros': [
                    'Provides separate legal personality (can sign contracts, own property).',
                    'Limits the personal liability of directors.',
                    'Perceived as more formal and credible by funders and government.',
                    'Clear governance structure required by the Companies Act.'
                ],
                'cons': [
                    'More complex and costly to set up and maintain (CIPC registration).',
                    'Requires stricter governance and annual reporting to CIPC.',
                    'Less flexible than a Voluntary Association.'
                ]
            },
            'Trust': {
                'fullName': 'Charitable Trust',
                'description': 'A Trust is a legal structure where trustees manage assets on behalf of beneficiaries. It is created via a Trust Deed and registered with the Master of the High Court.',
                'pros': [
                    'Excellent for protecting and managing long-term assets (property, investments).',
                    'Can exist indefinitely (perpetual succession).',
                    'Offers good liability protection for trustees if managed correctly.'
                ],
                'cons': [
                    'Less flexible for running active, operational programs.',
                    'Can be complex and expensive to set up (requires a notary).',
                    'Governance structure is managed by Trustees and can be less democratic.'
                ]
            },
            'VA': {
                'fullName': 'Voluntary Association (VA)',
                'description': 'A VA is the simplest structure, formed by a group of people with a common objective. It is governed by a constitution signed by its members.',
                'pros': [
                    'Very easy, fast, and cheap to set up.',
                    'Highly flexible and simple to manage with minimal formalities.',
                    'Ideal for community-based or member-driven organizations (clubs, forums).'
                ],
                'cons': [
                    'Does not have a separate legal personality by default.',
                    'Founders can be held personally liable for debts.',
                    'May be seen as less formal by large corporate funders or for big contracts.'
                ]
            }
        }
    }

    context = {
        'app_config_json': json.dumps(app_config)
    }
    
    return render(request, 'pboapp/structure_selector.html', context)